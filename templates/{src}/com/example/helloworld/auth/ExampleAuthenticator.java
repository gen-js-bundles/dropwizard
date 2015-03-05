package com.example.helloworld.auth;

import com.example.helloworld.core.User;
import com.google.common.base.Optional;
import <%=project.package%>.auth.AuthenticationException;
import <%=project.package%>.auth.Authenticator;
import <%=project.package%>.auth.basic.BasicCredentials;

public class ExampleAuthenticator implements Authenticator<BasicCredentials, User> {
    @Override
    public Optional<User> authenticate(BasicCredentials credentials) throws AuthenticationException {
        if ("secret".equals(credentials.getPassword())) {
            return Optional.of(new User(credentials.getUsername()));
        }
        return Optional.absent();
    }
}
