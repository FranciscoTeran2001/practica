--
-- adminQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comportamientoinicial; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.comportamientoinicial (
    id_comportamiento integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    comportamiento_nota_inicial character varying(1) NOT NULL,
    CONSTRAINT chk_comportamiento_valido CHECK (((comportamiento_nota_inicial)::text = ANY ((ARRAY['A'::character varying, 'B'::character varying, 'C'::character varying, 'D'::character varying, 'E'::character varying, 'F'::character varying])::text[])))
);


ALTER TABLE public.comportamientoinicial OWNER TO admin;

--
-- Name: ComportamientoInicial_id_comportamiento_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ComportamientoInicial_id_comportamiento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComportamientoInicial_id_comportamiento_seq" OWNER TO admin;

--
-- Name: ComportamientoInicial_id_comportamiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ComportamientoInicial_id_comportamiento_seq" OWNED BY public.comportamientoinicial.id_comportamiento;


--
-- Name: notasdesarrolloaprendizajeinicial; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.notasdesarrolloaprendizajeinicial (
    id_nota_desarrollo integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    id_curso integer NOT NULL,
    nombre_componente character varying(200) NOT NULL,
    numero_parcial_inicial integer NOT NULL,
    nota character varying(2) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eje_desarrollo character varying(100) NOT NULL,
    CONSTRAINT chk_eje_desarrollo_valido CHECK (((eje_desarrollo)::text = ANY ((ARRAY['Desarrollo personal y social'::character varying, 'Descubrimiento del medio natural y cultural'::character varying, 'Expresion y comunicacion'::character varying])::text[]))),
    CONSTRAINT chk_nota_valida CHECK (((nota)::text = ANY ((ARRAY['I'::character varying, 'EP'::character varying, 'A'::character varying, 'NE'::character varying])::text[]))),
    CONSTRAINT chk_parcial_valido CHECK ((numero_parcial_inicial = ANY (ARRAY[1, 2, 3])))
);


ALTER TABLE public.notasdesarrolloaprendizajeinicial OWNER TO admin;

--
-- Name: TABLE notasdesarrolloaprendizajeinicial; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.notasdesarrolloaprendizajeinicial IS 'Tabla para almacenar las notas de desarrollo y aprendizaje del nivel inicial';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.id_nota_desarrollo; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.id_nota_desarrollo IS 'Identificador único autoincremental de cada registro';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.id_usuario; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.id_usuario IS 'ID del estudiante (relacionado con la tabla usuario)';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.id_curso; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.id_curso IS 'ID del curso (relacionado con la tabla curso)';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.nombre_componente; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.nombre_componente IS 'Nombre del componente de aprendizaje evaluado';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.numero_parcial_inicial; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.numero_parcial_inicial IS 'Número del parcial/quimestre (1, 2 o 3)';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.nota; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.nota IS 'Calificación cualitativa (I: Inicia, EP: En Proceso, A: Adquiere, NE: No Evaluado)';


--
-- Name: COLUMN notasdesarrolloaprendizajeinicial.fecha_registro; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.notasdesarrolloaprendizajeinicial.fecha_registro IS 'Fecha y hora en que se registró la nota';


--
-- Name: NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq" OWNER TO admin;

--
-- Name: NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq" OWNED BY public.notasdesarrolloaprendizajeinicial.id_nota_desarrollo;


--
-- Name: actividad; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.actividad (
    id_actividad integer NOT NULL,
    id_parcial integer NOT NULL,
    tipo_actividad character varying(20) NOT NULL,
    descripcion character varying(200),
    valor_maximo double precision,
    fecha_inicio_entrega date NOT NULL,
    fecha_fin_entrega date NOT NULL,
    titulo_actividad character varying(100) DEFAULT 'Actividad'::character varying NOT NULL
);


ALTER TABLE public.actividad OWNER TO admin;

--
-- Name: actividad_id_actividad_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.actividad ALTER COLUMN id_actividad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.actividad_id_actividad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: anio_lectivo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.anio_lectivo (
    id_aniolectivo integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_final date NOT NULL,
    estado_lectivo character varying(255) NOT NULL
);


ALTER TABLE public.anio_lectivo OWNER TO admin;

--
-- Name: anio_lectivo_id_aniolectivo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.anio_lectivo ALTER COLUMN id_aniolectivo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.anio_lectivo_id_aniolectivo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: calificacion; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.calificacion (
    id_calificacion integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    id_actividad integer NOT NULL,
    nota double precision NOT NULL,
    comentario character varying(200)
);


ALTER TABLE public.calificacion OWNER TO admin;

--
-- Name: calificacion_id_calificacion_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.calificacion ALTER COLUMN id_calificacion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.calificacion_id_calificacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: curso; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.curso (
    id_curso integer NOT NULL,
    id_aniolectivo integer NOT NULL,
    nombre_curso character varying(15) NOT NULL
);


ALTER TABLE public.curso OWNER TO admin;

--
-- Name: curso_id_curso_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.curso ALTER COLUMN id_curso ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.curso_id_curso_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: curso_materia; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.curso_materia (
    id_curso integer NOT NULL,
    id_materia integer NOT NULL
);


ALTER TABLE public.curso_materia OWNER TO admin;

--
-- Name: evidencias; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.evidencias (
    id_evidencia integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    id_curso integer NOT NULL,
    id_materia integer NOT NULL,
    nombre_archivo character varying(255) NOT NULL,
    archivo_pdf bytea NOT NULL,
    fecha_subida timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tamanio bigint NOT NULL,
    tipo_contenido character varying(100) NOT NULL,
    estado character varying(20) DEFAULT 'SIN_ENVIAR'::character varying,
    num_parcial smallint DEFAULT 1 NOT NULL,
    nombre_actividad character varying(100) DEFAULT 'Actividad sin nombre'::character varying NOT NULL,
    codigo_actividad character varying(50) DEFAULT 'ACT-DEFAULT'::character varying NOT NULL,
    tipo_actividad character varying(20),
    CONSTRAINT evidencias_estado_check CHECK (((estado)::text = ANY ((ARRAY['SIN_ENVIAR'::character varying, 'ENVIADO'::character varying, 'CALIFICADO'::character varying])::text[]))),
    CONSTRAINT evidencias_num_parcial_check CHECK (((num_parcial >= 1) AND (num_parcial <= 3))),
    CONSTRAINT evidencias_tamanio_check CHECK ((tamanio <= 10485760)),
    CONSTRAINT evidencias_tipo_actividad_check CHECK (((tipo_actividad)::text = ANY ((ARRAY['Deber'::character varying, 'Taller'::character varying, 'Trabajos en clase'::character varying, 'Prueba'::character varying, 'Examen'::character varying])::text[]))),
    CONSTRAINT evidencias_tipo_contenido_check CHECK (((tipo_contenido)::text = 'application/pdf'::text))
);


ALTER TABLE public.evidencias OWNER TO admin;

--
-- Name: evidencias_id_evidencia_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.evidencias_id_evidencia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evidencias_id_evidencia_seq OWNER TO admin;

--
-- Name: evidencias_id_evidencia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.evidencias_id_evidencia_seq OWNED BY public.evidencias.id_evidencia;


--
-- Name: materia; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.materia (
    id_materia integer NOT NULL,
    nombre_materia character varying(30) NOT NULL
);


ALTER TABLE public.materia OWNER TO admin;

--
-- Name: materia_id_materia_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.materia ALTER COLUMN id_materia ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.materia_id_materia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.notificaciones (
    id_notificacion integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    id_actividad integer,
    tipo_notificacion character varying(30) DEFAULT 'ACTIVIDAD'::character varying NOT NULL,
    mensaje_notificacion character varying(255) NOT NULL,
    fecha_notificacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    leida boolean DEFAULT false NOT NULL
);


ALTER TABLE public.notificaciones OWNER TO admin;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.notificaciones_id_notificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNER TO admin;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNED BY public.notificaciones.id_notificacion;


--
-- Name: parcial; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.parcial (
    id_parcial integer NOT NULL,
    id_materia integer NOT NULL,
    numero_parcial integer NOT NULL,
    id_curso integer NOT NULL,
    CONSTRAINT parcial_numero_parcial_check CHECK (((numero_parcial >= 1) AND (numero_parcial <= 3)))
);


ALTER TABLE public.parcial OWNER TO admin;

--
-- Name: parcial_id_parcial_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.parcial ALTER COLUMN id_parcial ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.parcial_id_parcial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: promedio_materia_estudiante; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.promedio_materia_estudiante (
    id_promedio_materia integer NOT NULL,
    id_usuario character varying(10) NOT NULL,
    id_aniolectivo integer NOT NULL,
    id_curso integer NOT NULL,
    id_materia integer NOT NULL,
    promedio_parcial1 double precision,
    promedio_parcial2 double precision,
    promedio_parcial3 double precision,
    promedio_final_materia double precision,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT promedio_materia_estudiante_promedio_final_materia_check CHECK (((promedio_final_materia >= (0)::double precision) AND (promedio_final_materia <= (10)::double precision))),
    CONSTRAINT promedio_materia_estudiante_promedio_parcial1_check CHECK (((promedio_parcial1 >= (0)::double precision) AND (promedio_parcial1 <= (10)::double precision))),
    CONSTRAINT promedio_materia_estudiante_promedio_parcial2_check CHECK (((promedio_parcial2 >= (0)::double precision) AND (promedio_parcial2 <= (10)::double precision))),
    CONSTRAINT promedio_materia_estudiante_promedio_parcial3_check CHECK (((promedio_parcial3 >= (0)::double precision) AND (promedio_parcial3 <= (10)::double precision)))
);


ALTER TABLE public.promedio_materia_estudiante OWNER TO admin;

--
-- Name: promedio_materia_estudiante_id_promedio_materia_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.promedio_materia_estudiante_id_promedio_materia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promedio_materia_estudiante_id_promedio_materia_seq OWNER TO admin;

--
-- Name: promedio_materia_estudiante_id_promedio_materia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.promedio_materia_estudiante_id_promedio_materia_seq OWNED BY public.promedio_materia_estudiante.id_promedio_materia;


--
-- Name: promediogeneralestudiante; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.promediogeneralestudiante (
    id_promedio_general integer NOT NULL,
    comportamiento character varying(1) NOT NULL,
    id_usuario character varying(10) NOT NULL,
    promedio_general double precision NOT NULL,
    id_curso integer NOT NULL
);


ALTER TABLE public.promediogeneralestudiante OWNER TO admin;

--
-- Name: promediogeneralestudiante_id_promedio_general_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.promediogeneralestudiante ALTER COLUMN id_promedio_general ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.promediogeneralestudiante_id_promedio_general_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rol; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre_rol character varying(20) NOT NULL
);


ALTER TABLE public.rol OWNER TO admin;

--
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.rol ALTER COLUMN id_rol ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rol_id_rol_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuario (
    id_usuario character varying(10) NOT NULL,
    nombres_usuario character varying(50) NOT NULL,
    apellidos_usuario character varying(50) NOT NULL,
    nickname_usuario character varying(30) NOT NULL,
    contrasena_usuario character varying(255) NOT NULL,
    estado_usuario character varying(20) NOT NULL,
    mfa_secret character varying(255),
    mfa_habilitado boolean DEFAULT false NOT NULL,
    email character varying(255),
    mfa_code_expiration timestamp without time zone,
    email_verificado boolean DEFAULT false NOT NULL,
    token_verificacion character varying(36),
    token_recuperacion character varying(255),
    expiracion_token timestamp without time zone
);


ALTER TABLE public.usuario OWNER TO admin;

--
-- Name: usuario_curso; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuario_curso (
    id_usuario character varying(255) NOT NULL,
    id_curso integer NOT NULL
);


ALTER TABLE public.usuario_curso OWNER TO admin;

--
-- Name: usuario_rol; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuario_rol (
    id_usuario character varying(255) NOT NULL,
    id_rol integer NOT NULL
);


ALTER TABLE public.usuario_rol OWNER TO admin;

--
-- Name: comportamientoinicial id_comportamiento; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comportamientoinicial ALTER COLUMN id_comportamiento SET DEFAULT nextval('public."ComportamientoInicial_id_comportamiento_seq"'::regclass);


--
-- Name: evidencias id_evidencia; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias ALTER COLUMN id_evidencia SET DEFAULT nextval('public.evidencias_id_evidencia_seq'::regclass);


--
-- Name: notasdesarrolloaprendizajeinicial id_nota_desarrollo; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notasdesarrolloaprendizajeinicial ALTER COLUMN id_nota_desarrollo SET DEFAULT nextval('public."NotasDesarrolloAprendizajeInicial_id_nota_desarrollo_seq"'::regclass);


--
-- Name: notificaciones id_notificacion; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id_notificacion SET DEFAULT nextval('public.notificaciones_id_notificacion_seq'::regclass);


--
-- Name: promedio_materia_estudiante id_promedio_materia; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante ALTER COLUMN id_promedio_materia SET DEFAULT nextval('public.promedio_materia_estudiante_id_promedio_materia_seq'::regclass);


--
-- Name: notasdesarrolloaprendizajeinicial NotasDesarrolloAprendizajeInicial_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notasdesarrolloaprendizajeinicial
    ADD CONSTRAINT "NotasDesarrolloAprendizajeInicial_pkey" PRIMARY KEY (id_nota_desarrollo);


--
-- Name: comportamientoinicial comportamientoinicial_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comportamientoinicial
    ADD CONSTRAINT comportamientoinicial_pkey PRIMARY KEY (id_comportamiento);


--
-- Name: evidencias evidencias_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias
    ADD CONSTRAINT evidencias_pkey PRIMARY KEY (id_evidencia);


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id_notificacion);


--
-- Name: actividad pk_actividad; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT pk_actividad PRIMARY KEY (id_actividad);


--
-- Name: anio_lectivo pk_anio_lectivo; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.anio_lectivo
    ADD CONSTRAINT pk_anio_lectivo PRIMARY KEY (id_aniolectivo);


--
-- Name: calificacion pk_calificacion; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.calificacion
    ADD CONSTRAINT pk_calificacion PRIMARY KEY (id_calificacion);


--
-- Name: curso pk_curso; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT pk_curso PRIMARY KEY (id_curso);


--
-- Name: curso_materia pk_curso_materia; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.curso_materia
    ADD CONSTRAINT pk_curso_materia PRIMARY KEY (id_curso, id_materia);


--
-- Name: materia pk_materia; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.materia
    ADD CONSTRAINT pk_materia PRIMARY KEY (id_materia);


--
-- Name: parcial pk_parcial; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcial
    ADD CONSTRAINT pk_parcial PRIMARY KEY (id_parcial);


--
-- Name: rol pk_rol; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT pk_rol PRIMARY KEY (id_rol);


--
-- Name: usuario pk_usuario; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT pk_usuario PRIMARY KEY (id_usuario);


--
-- Name: usuario_curso pk_usuario_curso; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_curso
    ADD CONSTRAINT pk_usuario_curso PRIMARY KEY (id_usuario, id_curso);


--
-- Name: usuario_rol pk_usuario_rol; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT pk_usuario_rol PRIMARY KEY (id_usuario, id_rol);


--
-- Name: promedio_materia_estudiante promedio_materia_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT promedio_materia_estudiante_pkey PRIMARY KEY (id_promedio_materia);


--
-- Name: promediogeneralestudiante promediogeneralestudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promediogeneralestudiante
    ADD CONSTRAINT promediogeneralestudiante_pkey PRIMARY KEY (id_promedio_general);


--
-- Name: evidencias uk_evidencia_codigo; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias
    ADD CONSTRAINT uk_evidencia_codigo UNIQUE (codigo_actividad);


--
-- Name: parcial uq_parcial_materia_curso_numero; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcial
    ADD CONSTRAINT uq_parcial_materia_curso_numero UNIQUE (id_materia, id_curso, numero_parcial);


--
-- Name: promedio_materia_estudiante uq_promedio_materia; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT uq_promedio_materia UNIQUE (id_usuario, id_curso, id_materia);


--
-- Name: idx_comportamiento_usuario; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_comportamiento_usuario ON public.comportamientoinicial USING btree (id_usuario);


--
-- Name: idx_evidencias_codigo_actividad; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_evidencias_codigo_actividad ON public.evidencias USING btree (codigo_actividad);


--
-- Name: idx_evidencias_usuario; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_evidencias_usuario ON public.evidencias USING btree (id_usuario);


--
-- Name: idx_notas_componente; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_notas_componente ON public.notasdesarrolloaprendizajeinicial USING btree (nombre_componente);


--
-- Name: idx_notas_curso; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_notas_curso ON public.notasdesarrolloaprendizajeinicial USING btree (id_curso);


--
-- Name: idx_notas_parcial; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_notas_parcial ON public.notasdesarrolloaprendizajeinicial USING btree (numero_parcial_inicial);


--
-- Name: idx_notas_usuario; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_notas_usuario ON public.notasdesarrolloaprendizajeinicial USING btree (id_usuario);


--
-- Name: idx_notif_usuario; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_notif_usuario ON public.notificaciones USING btree (id_usuario);


--
-- Name: actividad actividad_id_parcial_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_id_parcial_fkey FOREIGN KEY (id_parcial) REFERENCES public.parcial(id_parcial);


--
-- Name: calificacion calificacion_id_actividad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.calificacion
    ADD CONSTRAINT calificacion_id_actividad_fkey FOREIGN KEY (id_actividad) REFERENCES public.actividad(id_actividad);


--
-- Name: calificacion calificacion_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.calificacion
    ADD CONSTRAINT calificacion_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: curso curso_id_aniolectivo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_id_aniolectivo_fkey FOREIGN KEY (id_aniolectivo) REFERENCES public.anio_lectivo(id_aniolectivo);


--
-- Name: curso_materia curso_materia_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.curso_materia
    ADD CONSTRAINT curso_materia_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso);


--
-- Name: curso_materia curso_materia_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.curso_materia
    ADD CONSTRAINT curso_materia_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES public.materia(id_materia);


--
-- Name: evidencias evidencias_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias
    ADD CONSTRAINT evidencias_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso) ON DELETE CASCADE;


--
-- Name: evidencias evidencias_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias
    ADD CONSTRAINT evidencias_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES public.materia(id_materia) ON DELETE CASCADE;


--
-- Name: evidencias evidencias_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.evidencias
    ADD CONSTRAINT evidencias_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- Name: comportamientoinicial fk_comportamiento_usuario; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.comportamientoinicial
    ADD CONSTRAINT fk_comportamiento_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- Name: notasdesarrolloaprendizajeinicial fk_notas_curso; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notasdesarrolloaprendizajeinicial
    ADD CONSTRAINT fk_notas_curso FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso) ON DELETE CASCADE;


--
-- Name: notasdesarrolloaprendizajeinicial fk_notas_usuario; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notasdesarrolloaprendizajeinicial
    ADD CONSTRAINT fk_notas_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- Name: notificaciones fk_notif_actividad; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT fk_notif_actividad FOREIGN KEY (id_actividad) REFERENCES public.actividad(id_actividad);


--
-- Name: notificaciones fk_notif_usuario; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT fk_notif_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: parcial fk_parcial_curso; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcial
    ADD CONSTRAINT fk_parcial_curso FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso);


--
-- Name: promediogeneralestudiante fka1bjfq171h6yxt2k309lega0x; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promediogeneralestudiante
    ADD CONSTRAINT fka1bjfq171h6yxt2k309lega0x FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso);


--
-- Name: parcial parcial_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcial
    ADD CONSTRAINT parcial_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES public.materia(id_materia);


--
-- Name: promedio_materia_estudiante promedio_materia_estudiante_id_aniolectivo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT promedio_materia_estudiante_id_aniolectivo_fkey FOREIGN KEY (id_aniolectivo) REFERENCES public.anio_lectivo(id_aniolectivo) ON DELETE CASCADE;


--
-- Name: promedio_materia_estudiante promedio_materia_estudiante_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT promedio_materia_estudiante_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso) ON DELETE CASCADE;


--
-- Name: promedio_materia_estudiante promedio_materia_estudiante_id_materia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT promedio_materia_estudiante_id_materia_fkey FOREIGN KEY (id_materia) REFERENCES public.materia(id_materia) ON DELETE CASCADE;


--
-- Name: promedio_materia_estudiante promedio_materia_estudiante_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.promedio_materia_estudiante
    ADD CONSTRAINT promedio_materia_estudiante_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE CASCADE;


--
-- Name: usuario_curso usuario_curso_id_curso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_curso
    ADD CONSTRAINT usuario_curso_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso);


--
-- Name: usuario_curso usuario_curso_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_curso
    ADD CONSTRAINT usuario_curso_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: usuario_rol usuario_rol_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT usuario_rol_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol);


--
-- Name: usuario_rol usuario_rol_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT usuario_rol_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- adminQL database dump complete
--




SET search_path = public;

-- Insertar roles
INSERT INTO rol (nombre_rol) VALUES
    ('Administrador'),
    ('Profesor'),
    ('Estudiante');


-- Insertar usuario
INSERT INTO usuario (
    id_usuario,
    nombres_usuario,
    apellidos_usuario,
    nickname_usuario,
    contrasena_usuario,
    estado_usuario,
    email,
    email_verificado,
    mfa_habilitado
) VALUES (
    '1724591902',
    'Dalton',
    'Arevalo',
    'djarevalo',
    '$2a$10$DVuw2Zz7Ru/1LdNC3yEa5e65D9Vq8cK0OHzBDsFQyS8ct9qrEuCmu',
    'Activo',
    'franciscoxtz54@gmail.com',
    true,
    false
);


-- Asignar rol Administrador (id_rol = 1) al usuario (id_usuario = '1717795882')
INSERT INTO usuario_rol (id_usuario, id_rol) VALUES
    ('1724591902', 1);
