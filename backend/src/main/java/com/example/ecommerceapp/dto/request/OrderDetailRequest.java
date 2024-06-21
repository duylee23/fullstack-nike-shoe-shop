package com.example.ecommerceapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailRequest {
    private int quantity;
    private double price;
    private String size;
    private Long productId;
}
