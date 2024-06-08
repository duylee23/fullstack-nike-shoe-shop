package com.example.ecommerceapp.config;

import com.example.ecommerceapp.entity.Token;
import com.example.ecommerceapp.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.SpringVersion;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class CustomLogoutHandler implements LogoutHandler {
    private final TokenRepository tokenRepository;


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        String token = authHeader.substring(7);
        //get token from database
        Token storedToken = tokenRepository.findByToken(token).orElse(null);
        //invalidate the token (make logout true)
        if(token != null) {
            storedToken.setLoggedOut(true);
            tokenRepository.save(storedToken);
        }
        response.addHeader("Access-Control-Allow-Origin", "*");

        //save the token
    }
}
