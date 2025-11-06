package com.klef.pro.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.pro.Model.Event;


@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
// add custom queries if needed
}
