package com.klef.pro.Controller;
import com.klef.pro.Model.Event;
import com.klef.pro.Service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // allow React dev server
public class EventController {
	private final EventService service;


	public EventController(EventService service) {
	this.service = service;
	}


	//✅ Get limited events (default)
	@GetMapping
	public List<Event> getLimitedEvents() {
	 List<Event> allEvents = service.findAll();
	 return allEvents.stream().limit(5).toList(); // only first 5
	}
	@GetMapping("/")
	public String rootMessage() {
	    return "🎉 Welcome to the Events API!";
	}

	//✅ Get ALL events
	@GetMapping("/all")
	public List<Event> getAllEvents() {
	 return service.findAll(); // full list
	}



	@GetMapping("/{id}")
	public ResponseEntity<Event> getById(@PathVariable Long id) {
	return service.findById(id)
	.map(ResponseEntity::ok)
	.orElse(ResponseEntity.notFound().build());
	}


	@PostMapping
	public ResponseEntity<Event> create(@Valid @RequestBody Event event) {
	Event saved = service.save(event);
	return new ResponseEntity<>(saved, HttpStatus.CREATED);
	}


	@PutMapping("/{id}")
	public ResponseEntity<Event> update(@PathVariable Long id, @Valid @RequestBody Event event) {
	return service.findById(id)
	.map(existing -> {
	// update fields
	existing.setTitle(event.getTitle());
	existing.setDescription(event.getDescription());
	existing.setStartTime(event.getStartTime());
	existing.setEndTime(event.getEndTime());
	existing.setLocation(event.getLocation());
	Event updated = service.save(existing);
	return ResponseEntity.ok(updated);
	})
	.orElse(ResponseEntity.notFound().build());
	}


	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
	if (service.findById(id).isPresent()) {
	service.deleteById(id);
	return ResponseEntity.noContent().build();
	}
	return ResponseEntity.notFound().build();
	}
	}

