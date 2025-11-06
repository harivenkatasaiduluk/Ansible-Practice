package com.klef.pro.Service;

import com.klef.pro.Model.Event;
import com.klef.pro.Repository.EventRepository;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class EventService {


private final EventRepository repository;


public EventService(EventRepository repository) {
this.repository = repository;
}


public List<Event> findAll() {
return repository.findAll();
}


public Optional<Event> findById(Long id) {
return repository.findById(id);
}


public Event save(Event event) {
return repository.save(event);
}


public void deleteById(Long id) {
repository.deleteById(id);
}
}
