package com.example.ecommerceapp.service;
import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.repository.UserRepository;
import lombok.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUserList() {
        return this.userRepository.findAll();
    }

    public User getUserByEmail(String email) throws UsernameNotFoundException{
        User user = this.userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return user;
    }

    public User getUserById(long id) {
        return this.userRepository.findById(id);
    }

    public User createUser(User user){

        return this.userRepository.save(user);
    }


    public boolean isPresentByEmail(String email){
        return this.userRepository.existsByEmail(email);
    }


}
