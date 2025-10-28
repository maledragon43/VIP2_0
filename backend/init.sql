-- Create database if not exists
CREATE DATABASE IF NOT EXISTS vip2_0;

-- Create user if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'vip2_user') THEN
        CREATE ROLE vip2_user WITH LOGIN PASSWORD 'vip2_password';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE vip2_0 TO vip2_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO vip2_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vip2_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vip2_user;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
