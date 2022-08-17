package com.wetness.model.service;

import com.wetness.db.entity.MapSessionRoom;
import com.wetness.db.entity.Room;
import com.wetness.db.entity.RoomUser;
import com.wetness.db.entity.User;
import com.wetness.db.repository.*;
import com.wetness.model.dto.request.DisconnectionReq;
import com.wetness.model.dto.request.EnterRoomReq;
import com.wetness.model.dto.request.MakeRoomReq;
import com.wetness.model.dto.response.EnterRoomRes;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final GameRepository gameRepository;
    private final RoomUserRepository roomUserRepository;

    private final WorkoutRepository workoutRepository;

    @Value("${wetness.openvidu.url}")
    private String OPENVIDU_URL;
    @Value("${wetness.openvidu.secret}")
    private String SECRET;
    private OpenVidu openVidu = new OpenVidu("https://localhost:8443/","WETNESS");
    // 운동종류(int) : {방제목 : 세션+방}
    private Map<String, MapSessionRoom> mapSessions = new ConcurrentHashMap<>();
    // 방 제목 : {유저 닉네임 : 커넥션}
    private Map<String, Map<String, Connection>> mapSessionNamesConnections = new ConcurrentHashMap<>();


    public void generateRoom(UserDetailsImpl userDetails, MakeRoomReq req) throws Exception {

        // DB에 저장할 방 만듦
        Room room = Room.builder()
                .title(req.getTitle())
                .password(req.getPassword())
                .workout(workoutRepository.findById(req.getWorkoutId()).get())
                .isLocked(!req.getPassword().equals(""))
                .createDate(new Timestamp(System.currentTimeMillis()))
                .managerId(userDetails.getId())
                .build();

        for(String title : this.mapSessions.keySet()){

            if(req.getTitle().equals(title)) throw new Exception("이미 같은 제목의 방이 있습니다");
        }

        // DB에 새로 생성된 방 저장
        room = roomRepository.save(room);
         
        // 세션-방 제목
        String roomTitle = room.getTitle();
        // 방을 만들고
        Session session = this.openVidu.createSession();

        mapSessions.put(roomTitle,new MapSessionRoom(room,session));

    }

    public EnterRoomRes makeToken(UserDetailsImpl userDetails, EnterRoomReq enterRoomReq) throws Exception {

        // 다른 참가자가 나를 닉네임으로 판변하기 위한 데이터
        String userData = "{\"nickname\": \"" + userDetails.getNickname() + "\"}";

        // 유저가 세션에 참가하기 위한 설정
        ConnectionProperties connectionProperties =
                        new ConnectionProperties.Builder()
                                .type(ConnectionType.WEBRTC).data(userData)
                                .role(OpenViduRole.PUBLISHER).build();

        MapSessionRoom mapSessionRoom = this.mapSessions.get(enterRoomReq.getTitle());
        for(String session : this.mapSessionNamesConnections.keySet()){
            if(this.mapSessionNamesConnections.get(session).containsKey(userDetails.getNickname())){
                throw new Exception("User Already Exists in Other Room");
            }
        }
        Room room = mapSessionRoom.getRoom();
        // 방이 잠겨있는데 비밀번호가 다르다면
        if(room.isLocked()&&!(room.getPassword().equals(enterRoomReq.getPassword()))) {
            return new EnterRoomRes("Unauthorized", room.getTitle(), userRepository.getOne(room.getManagerId()).getNickname(), room.getWorkout().getId());
        }
        Connection connection = mapSessionRoom.getSession()
                                .createConnection(connectionProperties);

        if(!this.mapSessionNamesConnections.containsKey(enterRoomReq.getTitle())){
            this.mapSessionNamesConnections.put(enterRoomReq.getTitle(), new ConcurrentHashMap<>());
        }
        this.mapSessionNamesConnections.get(enterRoomReq.getTitle()).put(userDetails.getNickname(), connection);

        roomUserRepository.save(RoomUser.builder()
                    .roomId(room.getId())
                    .userId(userDetails.getId())
                    .enterTime(new Timestamp(System.currentTimeMillis()))
                    .build());
            return new EnterRoomRes(connection.getToken(), room.getTitle(), userRepository.getOne(room.getManagerId()).getNickname(),room.getWorkout().getId());



    }

    @SneakyThrows
    @Transactional
    public void disconnect(DisconnectionReq req) {

        User user = userRepository.findByNickname(req.getNickname());
        String sessionName = req.getTitle();
        long roomId = this.mapSessions.get(sessionName).getRoom().getId();
        Room room = roomRepository.findById(roomId).orElse(null);
        if(room==null) throw new Exception("해당하는 방이 디비에 없습니다");
        // disconnection 된 사람이 방장이라면 방 삭제
        Session session = this.mapSessions.get(sessionName).getSession();
        Map<String,Connection> sessionInfo = this.mapSessionNamesConnections.get(sessionName);

        if(sessionInfo.size()==1){
            room.setTerminateDate(new Timestamp(System.currentTimeMillis()));
            this.mapSessions.remove(sessionName);
            this.mapSessionNamesConnections.remove(sessionName);
        }

        else{
            //방장이 나갔다면 세션 종료
            if(user.getId().equals(room.getManagerId())){
                session.close();
                sessionInfo.remove(req.getNickname());
                // 방장이 아니라면 세션으로의 커넥션 정보만 제거
            }else{
                sessionInfo.remove(req.getNickname());
            }
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

        return list.stream().distinct().collect(Collectors.toList());
    }

    private RoomListRes getRoomListResutil(String title){

        MapSessionRoom tmp = mapSessions.get(title);
        Room room = tmp.getRoom();
        int headcount = mapSessionNamesConnections.get(title).size();
        boolean isGaming = !gameRepository.findByRoomIdAndIsPlaying(room.getId(),true).isEmpty();

        return RoomListRes.builder()
                .workoutId(room.getWorkout().getId())
                .title(room.getTitle())
                .headcount(headcount)
                .isLocked(room.isLocked())
                .managerNickname(userRepository.getOne(room.getManagerId()).getNickname())
                .isGaming(isGaming)
                .build();
    }

    public Room getRoomByTitle(String title){

        return this.mapSessions.get(title).getRoom();
    }
}
