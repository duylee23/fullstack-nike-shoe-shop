package com.example.ecommerceapp.config;

import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.repository.TokenRepository;
import com.example.ecommerceapp.service.CustomUserDetailsService;
import com.example.ecommerceapp.service.JwtService;
import com.example.ecommerceapp.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
           @NonNull HttpServletRequest request,
           @NonNull HttpServletResponse response,
           @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            var isTokenValid = tokenRepository.findByToken(token).map(t -> !t.isLoggedOut()).orElse(false);
            if(jwtService.isValid(token, userDetails) && isTokenValid){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

        // 1 obtain header that contains jwt
//        final String authHeader = request.getHeader("Authorization");
//        final String jwt;
//        final String userEmail;
//        if(authHeader == null && !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        // 2 obtain jwt from header
//        jwt = authHeader.substring(7);
//
//        // 3 obtain subject/username in jwt
//        userEmail = jwtService.extractUserName(jwt);
//
//        // 4 set authenticate object inside our security context
//        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
//
//            if(jwtService.isTokenValid(jwt, userDetails)) {
//                 UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities()
//                );
//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                //update security context holder
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//
//
//    private String getTokenFromRequest(HttpServletRequest request) {
//        String bearerToken = request.getHeader("Authorization");
//        if(bearerToken != null && bearerToken.startsWith("Bearer ") ) {
//            return bearerToken.substring(7);
//        }
//        return null;
//    }
//
//    private boolean validateToken (String token) {
//        //logic to validate token here
//        return true;
//    }
//
//    private Authentication getAuthentication(String token) {
//        //Logic to extract authentication details from the token
//        // and create an Authentication object
//        return null;
//    }
}
