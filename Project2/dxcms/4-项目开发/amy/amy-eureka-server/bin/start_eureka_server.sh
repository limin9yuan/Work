#!/usr/bin/env bash
java -jar amy-eureka-server-1.0-SNAPSHOT.jar --spring.profiles.active=eureka1 --log.app.name=eureka1

java -jar amy-eureka-server-1.0-SNAPSHOT.jar --spring.profiles.active=eureka2 --log.app.name=eureka2

java -jar amy-eureka-server-1.0-SNAPSHOT.jar --spring.profiles.active=eureka3 --log.app.name=eureka3
