package com.example.ecommerceapp.service;

import com.example.ecommerceapp.dto.response.AuthenticationResponse;
import com.example.ecommerceapp.entity.Role;
import com.example.ecommerceapp.entity.Token;
import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;

    public AuthenticationResponse register (User request) {
        // check if user already exist. if exist than authenticate the user
        if(userService.isPresentByEmail(request.getEmail())) {
            return new AuthenticationResponse(null, "User already exist", null);
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if(request.getRole() == null){
            Role defaultRole = userService.getRoleByName("USER");
            user.setRole(defaultRole);
        } else {
            user.setRole(request.getRole());
        }
        userService.createUser(user);
        String jwt = jwtService.generateToken(user);
        saveUserToken(jwt, user);
         return new AuthenticationResponse(jwt, "User registration successfully", user.getFullName());
    }

    public AuthenticationResponse authenticate(User request) throws RuntimeException{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            User user = userService.getUserByEmail(request.getEmail());
            String jwt = jwtService.generateToken(user);
            saveUserToken(jwt, user);
            revokeAllTokenByUser(user);
            return new AuthenticationResponse(jwt, "Login successfully! ", user.getFullName());
        } catch (Exception e) {
            // Handle failed authentication
            throw new RuntimeException("Invalid credentials", e);
        }
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokenListByUser = tokenRepository.findAllTokensByUser(user.getId());
        if(!validTokenListByUser.isEmpty()){
            validTokenListByUser.forEach(token -> {
                token.setLoggedOut(true);
            });
        }
        tokenRepository.saveAll(validTokenListByUser);
    }




    //for login
//    public AuthenticationResponse login(LoginRequest request) throws Exception {
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                request.getEmail(), request.getPassword()
//        );
//        authenticationManager.authenticate(authToken);
//        User user = userService.getUserByEmail(request.getEmail());
//        String jwt = jwtService.generateAccessToken(user.getEmail());
//                return AuthenticationResponse.builder()
//                        .accessToken(jwt)
//                        .build();
//    }

    //for register
//    public AuthenticationResponse register(RegisterRequest request){
//        var user = User.builder()
//                .fullName(request.getFullName())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(request.getRole())
//                .build();
//        user.setRole(request.getRole());
//        this.userService.createUser(user);
//        var jwtToken = jwtService.generateToken(user.getEmail(), generateExtraClaims(user)); // Access token
//        var refreshToken = jwtService.refreshToken(jwtToken); // Refresh token
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                .refreshToken(refreshToken)
//                .build();
//    }
//    public AuthenticationResponse register(RegisterRequest request){
//        var user = User.builder()
//                .fullName(request.getFullName())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(request.getRole())
//                .build();
//        this.userService.createUser(user);
//        var jwtToken = jwtService.generateToken(user); // Access token
//        var refreshToken = jwtService.generateRefreshToken(user);
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                    .refreshToken(refreshToken)
//                .build();
//    }
//
//    public AuthenticationResponse login(LoginRequest request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        var user = userService.getUserByEmail(request.getEmail());
//        String jwtToken = jwtService.generateAccessToken(user);
//        String refreshToken = jwtService.generateRefreshToken(user);
//
//        return AuthenticationResponse.builder()
//                .accessToken(jwtToken)
//                .refreshToken(refreshToken)
//                .build();
//    }
//
//    private Map<String, Object> generateExtraClaims(User user) {
//        Map<String, Object> extraClaims = new HashMap<>();
//        extraClaims.put("name", user.getEmail());
//        extraClaims.put("role", user.getRole().getName());
//        return extraClaims;
//    }
//
//
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        final String refreshToken;
//        final String userEmail;
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        refreshToken = authHeader.substring(7);
//        userEmail = jwtService.extractUserName(refreshToken);
//        if (userEmail != null) {
//            var user = userService.getUserByEmail(userEmail);
//            if (jwtService.isTokenValid(refreshToken, user)) {
//                var accessToken = jwtService.generateToken(user);
//                var authResponse = AuthenticationResponse.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
//            }
//        }
}
