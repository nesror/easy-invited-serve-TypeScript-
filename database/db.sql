-- auto-generated definition
create table user
(
    user_id       varchar(50)                                  not null
        primary key,
    user_name     varchar(20)                                  null,
    user_password varchar(255)                                 null,
    session_key   varchar(50)                                  null,
    wx_openid     varchar(50)                                  null,
    create_time      timestamp       default CURRENT_TIMESTAMP null,
    update_time      timestamp       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    user_img      varchar(255)                                 null,
    phone         int(20)                                      null
);

-- auto-generated definition
create table activity
(
    activity_id      int auto_increment comment '活动id'
        primary key,
    owner            varchar(50)                               not null comment '创建者',
    activity_name    varchar(255)                              not null comment '活动名称',
    activity_content varchar(255)                              null comment '活动内容',
    activity_ext     json                                      null comment '扩展字段',
    start_time       datetime                                  null comment '开始时间',
    end_time         datetime                                  null comment '结束时间',
    create_time      timestamp       default CURRENT_TIMESTAMP null,
    update_time      timestamp       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    address          varchar(255)                              null comment '地点',
    latitude         float(8, 5)                               null comment '纬度',
    longitude        float(8, 5)                               null comment '经度',
    state            int(1) unsigned default 0                 not null comment '0：正常，1：关闭',
    form_id          varchar(100)                              null,
    img_input        varchar(255)                              null,
    after_join       varchar(255)                              null,
    constraint activity_ibfk_1
        foreign key (owner) references user (user_id)
);

create index owner
    on activity (owner);

-- auto-generated definition
create table user_join
(
    user_id     varchar(50)                                    not null,
    activity_id int                                            null,
    id          int auto_increment
        primary key,
    form_id     varchar(100)                                   null,
    remark      varchar(255)                                   null,
    join_num    int default 1                                  null comment '参与人数',
    create_time      timestamp       default CURRENT_TIMESTAMP null,
    update_time      timestamp       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint ids
        unique (user_id, activity_id),
    constraint user_join_ibfk_1
        foreign key (user_id) references user (user_id)
            on update cascade,
    constraint user_join_ibfk_2
        foreign key (activity_id) references activity (activity_id)
            on update cascade on delete set null
);

create index activity_id
    on user_join (activity_id);

create index user_id
    on user_join (user_id);



