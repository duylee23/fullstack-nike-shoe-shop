package com.example.ecommerceapp.service;

import com.example.ecommerceapp.model.User;
import com.example.ecommerceapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUserList() {
        return this.userRepository.findAll();
    }
    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public User getUserById(long id) {
        return this.userRepository.findById(id);
    }

    public User createUser(User user){
        return this.userRepository.save(user);
    }
}
