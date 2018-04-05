INSERT INTO users (first_name, last_name, email, username, password)
VALUES (${firstName}, ${lastName}, ${email}, ${username}, ${password})
RETURNING *;