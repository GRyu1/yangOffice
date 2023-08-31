package com.yangworld.app.domain.photoFeed.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.yangworld.app.config.auth.PrincipalDetails;
import com.yangworld.app.domain.photoFeed.dto.Like;
import com.yangworld.app.domain.photoFeed.dto.PhotoFeedAll;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.yangworld.app.commons.HelloSpringUtils;
import com.yangworld.app.domain.attachment.entity.Attachment;
import com.yangworld.app.domain.member.entity.Member;
import com.yangworld.app.domain.photoFeed.dto.PeedCreateDto;
import com.yangworld.app.domain.photoFeed.entity.FeedDetails;
import com.yangworld.app.domain.photoFeed.service.PhotoFeedService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/feed/{id}")
public class PhotoFeedController {

	@Autowired
	private PhotoFeedService photoFeedService;


	@PatchMapping("/feedCreate")
	public ResponseEntity<?> feedCreate(
			@RequestPart @Valid PeedCreateDto _feed,
			BindingResult bindingResult,
			@AuthenticationPrincipal PrincipalDetails member,
			@RequestPart(value = "upFile", required = false) List<MultipartFile> upFiles)
					throws IllegalStateException, IOException {

		log.info("upFiles ={}",upFiles);

		// file, _feed, member를 가지고 service로 이동 service에서 처리
		int result = photoFeedService.insertfeed(_feed, member, upFiles);

		if (result > 0) {
	        // 성공적으로 생성되었을 경우
			return ResponseEntity.ok().body(result);
	    } else {
	        // 생성 중 오류가 발생한 경우
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create feed");
	    }
	}

	@GetMapping("/feedDetail")
	public ResponseEntity<?> feedDetail(
			@RequestParam int id,
			@RequestParam int feedId){

		List<PhotoFeedAll> photoDetails = photoFeedService.findPhotoFeedAll(id, feedId);

		return ResponseEntity.ok().body(photoDetails);
	}

	@DeleteMapping("/feedDelete")
	public ResponseEntity<?> deleteFeed(
			@RequestParam int feedId,
			@AuthenticationPrincipal PrincipalDetails member
	) {

		int result = photoFeedService.deleteFeed(member,feedId);

		return ResponseEntity.ok().body(result);
	}

	@PatchMapping("/feedUpdate")
	public ResponseEntity<?> updateFeed(
		@RequestParam int feedId,
		@RequestParam String content,
		@AuthenticationPrincipal PrincipalDetails member
	){

		int result = photoFeedService.updateFeed(feedId, content, member);

		return ResponseEntity.ok().body(result);
	}


	@PatchMapping("/like")
	public ResponseEntity<?> feedLikeUpdate(
			@RequestParam int feedId,
			@AuthenticationPrincipal PrincipalDetails member
	) {

		Like likeCount = photoFeedService.likeCheck(feedId, member);

		return ResponseEntity.ok().build();
	}



}
