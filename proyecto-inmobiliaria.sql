select * from inmuebles
select * from usuarios
select * from perfiles

insert into perfiles (id, nombre) values (1, admin)
insert into perfiles (id, nombre) values (2, 'permiso_nivel_1')
insert into perfiles (id, nombre) values (3, 'permiso_nivel_2')
insert into perfiles (id, nombre) values (4, 'permiso_nivel_3')


insert into usuarios (id, nombre, apellido, email, clave, id_perfil) values (1, 'admin', 'administrator', 'administrator@gmail.com', admin, 1)
insert into usuarios (id, nombre, apellido, email, clave, id_perfil) values (2, 'usuario_1', 'nivel_1', 'usuario1@gmail.com', 159753, 2)
insert into usuarios (id, nombre, apellido, email, clave, id_perfil) values (3, 'usuario_2', 'nivel_2', 'usuario2@gmail.com', 159753, 3)
insert into usuarios (id, nombre, apellido, email, clave, id_perfil) values (4, 'usuario_3', 'nivel_3', 'usuario3@gmail.com', 789456, 4)


insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (1, 'Casa-1', 100, 'Av. Colón 123', 1, 50000)
insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (2, 'Casa-2', 300, 'Empalme 345', 1, 250000)
insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (3, 'Casa-3', 150, 'Garibaldi 2345', 1, 80000)
insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (4, 'Casa-4', 200, 'Asunción 342', 1, 150000)
insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (5, 'Casa-5', 120, 'Rondeau 4567', 1, 190000)
insert into inmuebles (id, nombre, metrosCuadrados, direccion, precioVenta, id_usuario) values (6, 'Casa-6', 350, 'Av. Rafael Nuñes 200', 1, 400000)





