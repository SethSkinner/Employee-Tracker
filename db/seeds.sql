use employee_db;

INSERT INTO departments (d_name) VALUES
    ('sales'),
    ('engineering'),
    ('marketing'),
    ('management');

INSERT INTO roles (title, Salary, d_id) VALUES
    ('salesman', 60000.00, 1),
    ('Sales Manager', 90000.00, 4),
    ('jr developer', 65000, 2),
    ('Sr developer', 95000, 4),
    ('marketing representative.00', 115000, 3),
    ('marketing director', 1200000.00, 4),
    ('cofounder', 150000.00, 4),
    ('founder', 200000.00, 4);

INSERT INTO employees (f_name, l_name, r_id, m_id) VALUES
    ('seth', 'skinner', 1, NULL),
    ('bob', 'jones', 2, 1),
    ('billy', 'joe', 3, NULL),
    ('peter', 'pumpkineater', 4, 2),
    ('roger', 'waters', 5, NULL),
    ('david', 'guilmour', 6, 3),
    ('joe', 'bob', 7, 4),
    ('jill', 'rose', 8, 5);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;