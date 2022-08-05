package com.wetness.model.service;

import com.wetness.db.entity.MapSessionRoom;
import com.wetness.db.entity.RoomUser;
import com.wetness.db.repository.RoomUserRepository;
import com.wetness.db.repository.UserRepository;
import com.wetness.model.dto.request.DisconnectionReq;
import com.wetness.model.dto.request.EnterRoomReq;
import com.wetness.model.dto.request.MakeRoomReq;
import com.wetness.model.dto.response.RoomListRes;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;

    @Value("${wetness.openvidu.url}")
    private String OPENVIDU_URL;
    @Value("${wetness.openvidu.secret}")
    private String SECRET;
    private OpenVidu openVidu = new OpenVidu("localhost:4443","MY_SECRET");
    // 운동종류(int) : {방제목 : 세션+방}
    private Map<String, MapSessionRoom> mapSessions = new ConcurrentHashMap<>();
    // 방 제목 : {유저 닉네임 : 커넥션}
    private Map<String, Map<String, Connection>> mapSessionNamesConnections = new ConcurrentHashMap<>();


    public void generateRoom(UserDetailsImpl userDetails, MakeRoomReq req) throws OpenViduJavaClientException, OpenViduHttpException {

        // DB에 저장할 방 만듦
        Room room = Room.builder()
                .title(req.getTitle())
                .password(req.getPassword())
                .workoutId(req.getWorkout())
                .isLocked(!req.getPassword().equals(""))
                .createDate(new Timestamp(System.currentTimeMillis()))
                .managerId(userDetails.getId())
                .build();

        // DB에 새로 생성된 방 저장
        room = roomRepository.save(room);
         
        // 세션-방 제목
        String roomTitle = room.getTitle();
        // 방을 만들고
        Session session = this.openVidu.createSession();

        mapSessions.put(roomTitle,new MapSessionRoom(room,session));

    }

    public String makeToken(UserDetailsImpl userDetails, EnterRoomReq enterRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {

        // 다른 참가자가 나를 닉네임으로 판변하기 위한 데이터
        String userData = "{\"nickname\": \"" + userDetails.getNickname() + "\"}";

        // 유저가 세션에 참가하기 위한 설정
        ConnectionProperties connectionProperties =
                        new ConnectionProperties.Builder()
                                .type(ConnectionType.WEBRTC).data(userData)
                                .role(OpenViduRole.PUBLISHER).build();

        MapSessionRoom mapSessionRoom = this.mapSessions.get(enterRoomReq.getSessionName());

        Room room = mapSessionRoom.getRoom();
        // 방이 잠겨있는데 비밀번호가 다르다면
        if(room.isLocked()&&!(room.getPassword().equals(enterRoomReq.getPassword()))) {
            return "Unauthorized";
        }

            Connection connection = mapSessionRoom.getSession()
                    .createConnection(connectionProperties);

            this.mapSessionNamesConnections.get(enterRoomReq.getSessionName()).put(userDetails.getNickname(), connection);
            RoomUser roomUser = roomUserRepository.save(RoomUser.builder()
                    .roomId(room.getId())
                    .userId(userDetails.getId())
                    .enterTime(new Timestamp(System.currentTimeMillis()))
                    .build());

            return connection.getToken();



    }

    @SneakyThrows
    @Transactional
    public void disconnect(DisconnectionReq req) throws OpenViduJavaClientException, OpenViduHttpException {

        User user = userRepository.findByNickname(req.getNickname());
        String sessionName = req.getSessionName();
        Session session = this.mapSessions.get(sessionName).getSession();
        long roomId = this.mapSessions.get(sessionName).getRoom().getId();
        Room room = roomRepository.findById(roomId).orElse(null);
        if(room==null) throw new Exception("해당하는 방이 디비에 없습니다");

        // disconnection 된 사람이 방장이라면 방 삭제
        int managerId = (int) this.mapSessions.get(sessionName).getRoom().getManagerId();
        if(managerId==user.getId()){

            room.setTerminateDate(new Timestamp(System.currentTimeMillis()));
            session.close();
            this.mapSessions.remove(sessionName);
            this.mapSessionNamesConnections.remove(sessionName);
            
        // 방장이 아니라면 세션으로의 커넥션만 제거
        }else{

            String connectionId = this.mapSessionNamesConnections.get(sessionName).get(req.getNickname()).getConnectionId();
            List<Connection> list = session.getActiveConnections();
            // 커넥션이 유지되고 있다면 제거
            boolean match = list.stream()
                    .anyMatch(connection -> connection.getConnectionId().equals(connectionId));
            if(match){
                session.forceDisconnect(connectionId);
            }

            this.mapSessionNamesConnections.get(sessionName).remove(req.getNickname());
        }
        // room_user 테이블에서 방을 나간 시간 설정
        RoomUser roomUser = roomUserRepository.findByRoomIdAndUserId(room.getId(), user.getId());
        roomUser.setLeaveTime(new Timestamp(System.currentTimeMillis()));

    }

    public List<RoomListRes> getlist(){

        List<RoomListRes> list = new ArrayList<>();

        for(String key : mapSessions.keySet()){

            list.add(getRoomListResutil(key));
        }

        return list;
    }

    public List<?> getSearch(String keyword){

        List<RoomListRes> list = new ArrayList<>();

        // 방 제목에서 찾기
        for(String key : mapSessions.keySet()){

            if(key.contains(keyword)){

                list.add(getRoomListResutil(key));
            }
        }

        // 방안에 있는 유저 중 찾기
        for(String key : mapSessionNamesConnections.keySet()){

            Map<String,Connection> tmp = mapSessionNamesConnections.get(key);
            for(String nickname : tmp.keySet()){

                if(nickname.contains(keyword)){
                    list.add(getRoomListResutil(key));
                }
            }
        }

        return list;
    }

    private RoomListRes getRoomListResutil(String title){

        MapSessionRoom tmp = mapSessions.get(title);
        Room room = tmp.getRoom();
        int headcount = mapSessionNamesConnections.get(title).size();

        return RoomListRes.builder()
                .workout(room.getWorkoutId())
                .title(room.getTitle())
                .headcount(headcount)
                .isLocked(room.isLocked())
                .managerNickname(userRepository.getOne(room.getManagerId()).getNickname())
                //.isGaming()
                .build();
    }
}
