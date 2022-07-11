  INSERT INTO department (name)
  VALUES
  ('Operations'),
  ('Sales'),
  ('Hr'),
  ('Legal');
  

INSERT INTO role (title, salary,department_id)
VALUES
  ('Manager', 190000,1),
  ('Supervisor', 80000,2),
  ('Partner', 90000,3),
  ('Operations',65000,4);


INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES
 ('Ronald', 'Firbank', 1,1),
  ('Virginia', 'Woolf', 1,1),
  ('Charles', 'LeRoi',2,NULL),
  ('Katherine', 'Mansfield',2,1),
  ('Montague', 'Summers',3,1),
  ('Octavia', 'Butler',3,NULL),
  ('Unica', 'Zurn',1,1);
