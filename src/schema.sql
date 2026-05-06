
//USERS TABLE

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


// CANDIDATES TABLE

CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    years_of_experience INT DEFAULT 0,
    primary_skill VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// POSITIONS TABLE
CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    filled INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open'
        CHECK (status IN ('open', 'closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// APPLICATIONS TABLE
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,

    candidate_id INT NOT NULL,
    position_id INT NOT NULL,

    status VARCHAR(50) NOT NULL
        CHECK (
            status IN (
                'applied',
                'screening',
                'interview',
                'rejected',
                'accepted'
            )
        ),

    source VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_candidate
        FOREIGN KEY(candidate_id)
        REFERENCES candidates(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_position
        FOREIGN KEY(position_id)
        REFERENCES positions(id)
        ON DELETE CASCADE
);

// INTERVIEW NOTES TABLE
CREATE TABLE interview_notes (
    id SERIAL PRIMARY KEY,

    application_id INT NOT NULL,

    note TEXT NOT NULL,

    rating INT
        CHECK (rating >= 1 AND rating <= 5),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application
        FOREIGN KEY(application_id)
        REFERENCES applications(id)
        ON DELETE CASCADE
);

//  INDEXES (Performance)

CREATE INDEX idx_candidate_email
ON candidates(email);

CREATE INDEX idx_application_status
ON applications(status);

CREATE INDEX idx_position_status
ON positions(status);

CREATE INDEX idx_application_candidate
ON applications(candidate_id);

CREATE INDEX idx_application_position
ON applications(position_id);