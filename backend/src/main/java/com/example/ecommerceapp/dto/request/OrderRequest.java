package com.example.ecommerceapp.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class OrderRequest {
    private String receiverName;
    private String receiverPhone;
    private String receiverAddress;
    private double totalPayment;
    private List<OrderDetailRequest> orderDetail;
}
