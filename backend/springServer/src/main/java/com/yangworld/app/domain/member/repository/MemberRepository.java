package com.yangworld.app.domain.member.repository;

import com.yangworld.app.config.auth.PrincipalDetails;
import com.yangworld.app.domain.member.dto.SignUpDto;
import com.yangworld.app.domain.member.dto.UpdateDto;
import org.apache.ibatis.annotations.*;
import com.yangworld.app.domain.member.entity.Member;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Mapper
public interface MemberRepository {
    @Insert("insert into member values(seq_member_id.nextval, #{username},  #{name}, #{password}, #{nickname}, #{birthday}, #{gender}, #{phone}, #{email, jdbcType=VARCHAR}, 'YANG', default)")
    @SelectKey(
            before = false,
            keyProperty = "id",
            resultType = int.class,
            statement = "select seq_member_id.currval from dual")
    int insertMember(SignUpDto signUpDto);
    int insertAuthorities(int id, List<String> authorityList);

    PrincipalDetails loadUserByUsername(String username);

    @Update("update member set password=#{password} where username = #{username}")
    void updatePassword(@Param("username") String username, @Param("password") String password);


    @Update("update member set password = #{updateDto.password}, nickname = #{updateDto.nickname}, phone = #{updateDto.phone}, email=#{updateDto.email}, birthday = #{updateDto.birthday} where username = #{username}")
    int updateMember(@Param("updateDto") UpdateDto updateDto, @Param("username") String username);

    @Delete("delete from member where username = #{username}")
    int deleteMember(String username);
    
}

