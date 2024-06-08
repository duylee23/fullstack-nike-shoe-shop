package com.example.ecommerceapp.service;

import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.Size;
import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    public Cart getCartByUserEmail(String email) {
        User user = userService.getUserByEmail(email);
        return this.cartRepository.findByUser(user);
    }

}
