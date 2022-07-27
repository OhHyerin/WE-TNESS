package com.wetness.core.queryrepository;

import com.wetness.model.User;

public interface UserQueryRepository {

    User findOneBySocial(int social, String socialToken);
}
