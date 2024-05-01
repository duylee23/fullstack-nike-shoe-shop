package com.example.ecommerceapp.controller.admin;

import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class UserController {
    private final UserService userService;

    //get a list of all users
    @GetMapping("/user")
    public ResponseEntity<List> getUserList() {
        List<User> userList = this.userService.getUserList();
        if (userList != null) {
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //get a user's details
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserDetail(@PathVariable long id) {
        User user = this.userService.getUserById(id);
        if(user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //create a new user
    @PostMapping("/user/create")
    public ResponseEntity<?> createNewUser(@RequestBody User user) {
        try{
            User createdUser = this.userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

}
