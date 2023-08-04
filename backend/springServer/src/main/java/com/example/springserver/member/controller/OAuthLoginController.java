package com.example.springserver.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OAuthLoginController {
    @GetMapping("/ping")
    public ResponseEntity<String> ping () {
        return ResponseEntity.ok().body("pong");
    }
}
