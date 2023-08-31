package com.yangworld.app.domain.comments.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Comments {

    private int id;
    private int writerId;
    private String nickName;
    private String content;
    private LocalDateTime regDate;
}
