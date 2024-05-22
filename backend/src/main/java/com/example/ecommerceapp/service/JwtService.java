package com.example.ecommerceapp.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${jwt.expiration.access}")
    private long accessTokenExpiration;

    @Value("${jwt.expiration.refresh}")
    private long refreshTokenExpiration;

    private Key key;

    public String generateToken(UserDetails user) {
        String token = Jwts
                .builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                .signWith(getSignInKey())
                .compact();
        return token;
    }

    private Claims extractAllClaims(String jwt) {
        try {
            // Attempt to parse the JWT
            return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // Log detailed information about the token expiration
            Date now = new Date();
            System.out.println("Token expired at: " + e.getClaims().getExpiration() + ", current time: " + now);
            throw new RuntimeException("Token expired. Token expiration time: " + e.getClaims().getExpiration() + ", current time: " + now, e);
        } catch (Exception e) {
            // For other exceptions, provide a generic error message
            throw new RuntimeException("Failed to parse token", e);
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }
    private boolean isTokenExpired (String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

//    @PostConstruct
//    private void init() {
//        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//    }
//
//
//
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }
//
//    public String generateToken(UserDetails userDetails, Map<String, Object> extraClaims) {
//            return buildToken(extraClaims, userDetails, 86400000);
//    }
//
//    //basic
//    public String generateToken(UserDetails userDetails){
//        return generateToken(userDetails, new HashMap<>());
//    }
//
//
//    public String generateAccessToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        // Current time plus 24 hours for access token
//        long expirationTimeInMs = 86400000; // 24 hours in milliseconds
//        return buildToken(claims, userDetails, expirationTimeInMs);
//    }
//
//    public String generateRefreshToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        // Current time plus 7 days for refresh token
//        long expirationTimeInMs = 604800000; // 7 days in milliseconds
//        return buildToken(claims, userDetails, expirationTimeInMs);
//    }
//
//
//    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + expiration);
//        System.out.println("Token for " + userDetails.getUsername() + " issued at: " + now + ", expires at: " + expiryDate);
//        return Jwts.builder()
//                .setClaims(extraClaims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    //check token valid?
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        try {
//            final String userName = extractUserName(token);
//            return userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
//        } catch (ExpiredJwtException e) {
//            System.out.println("Token expired; redirecting to login or refresh token");
//            return false;  // Redirect to login or refresh token
//        }
//    }
//
//    //check token expired?
//    public boolean isTokenExpired(String token) {
//        Date expiration = extractExpiration(token);
//        boolean expired = expiration.before(new Date());
//        System.out.println("Token expiration: " + expiration + ", now: " + new Date() + ", expired: " + expired);
//        return expired;
//    }
//
//    private Claims extractAllClaims(String jwt) {
//        try {
//            // Attempt to parse the JWT
//            return Jwts.parserBuilder()
//                    .setSigningKey(getSignInKey())
//                    .build()
//                    .parseClaimsJws(jwt)
//                    .getBody();
//        } catch (ExpiredJwtException e) {
//            // Log detailed information about the token expiration
//            Date now = new Date();
//            System.out.println("Token expired at: " + e.getClaims().getExpiration() + ", current time: " + now);
//            throw new RuntimeException("Token expired. Token expiration time: " + e.getClaims().getExpiration() + ", current time: " + now, e);
//        } catch (Exception e) {
//            // For other exceptions, provide a generic error message
//            throw new RuntimeException("Failed to parse token", e);
//        }
//    }
//
//    public <T> T extractClaim (String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claims != null ? claimsResolver.apply(claims) : null;
//    }
//
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    public String extractUserName(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
}

