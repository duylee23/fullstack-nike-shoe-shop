package com.example.ecommerceapp.service;

import com.example.ecommerceapp.entity.CartDetail;
import com.example.ecommerceapp.repository.CartDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;

    public void deleteCartById(long id) {

        this.cartDetailRepository.deleteById(id);
    }
}
