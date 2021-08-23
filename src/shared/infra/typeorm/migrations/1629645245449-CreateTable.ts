import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1629645245449 implements MigrationInterface {
    name = 'CreateTable1629645245449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usertoken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1088a1f717ca8bbddcd7a42de0c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "user_id" ON "usertoken" ("user_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "userDocument" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "document" character varying, "type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7f010bd56dcf754b0d1ce7085e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "user_document_user_id_fk" ON "userDocument" ("user_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "hospital" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "logradouro" character varying, "numero" character varying, "cep" character varying, "bairro" character varying, "cidade" character varying, "uf" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a23841c964290648eb2a851e84" UNIQUE ("name"), CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expertise_id" uuid NOT NULL, "hospital_id" uuid NOT NULL, "doctor_price" integer NOT NULL, "total_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "price_expertise_expertise_id_fk" ON "price" ("expertise_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "price_hospital_hospital_id_fk" ON "price" ("hospital_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "expertise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c1f773f9419573f6bc37eebb7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "userExpertise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expertise_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f5fd520a1dfb74473618cca2781" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "userexpertise_user_id_fk" ON "userExpertise" ("user_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "userexpertise_expertise_id_fk" ON "userExpertise" ("expertise_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "appointmentSolicitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "appointment_id" uuid NOT NULL, "accepted" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_730e54f01d387f78ee4b4418825" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "appointment_soliciation_appointment_id_fk" ON "appointmentSolicitation" ("appointment_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "appointment_soliciation_user_id_fk" ON "appointmentSolicitation" ("user_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "refreshtoken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e0b08d6bdd81bea2edab2beca0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "refresh_token_user_id_fk" ON "refreshtoken" ("user_id") `, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "crm" character varying, "rg" character varying, "cpf" character varying, "sus" character varying, "bank" character varying, "agency" character varying, "account" character varying, "street" character varying, "number" character varying, "cep" integer, "bairro" character varying, "cidade" character varying, "uf" character varying, "password" character varying NOT NULL, "role" character varying, "avatar" character varying, "cellphone" character varying, "birthday" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_62af96c4848f38864ef5b0db400" UNIQUE ("crm"), CONSTRAINT "UQ_0c80872d387dcf00c567ebd4ca5" UNIQUE ("rg"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_6a9e0f3624ba4678dc000da86d2" UNIQUE ("sus"), CONSTRAINT "UQ_15f2ebe082a6e43a960f9f88411" UNIQUE ("cellphone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "cellphone" ON "users" ("cellphone") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "rg" ON "users" ("rg") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "crm" ON "users" ("crm") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "cpf" ON "users" ("cpf") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "email" ON "users" ("email") `, undefined);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "hospital_id" uuid NOT NULL, "expertise_id" uuid NOT NULL, "title" character varying NOT NULL, "transfering" boolean NOT NULL DEFAULT false, "start_checkin" TIMESTAMP, "stop_checkin" TIMESTAMP, "doctor_price" integer NOT NULL, "total_price" integer NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "appointments_user_user_id_fk" ON "appointment" ("user_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "appointments_user_expertise_id_fk" ON "appointment" ("expertise_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "appointments_user_hospital_id_fk" ON "appointment" ("hospital_id") `, undefined);
        await queryRunner.query(`ALTER TABLE "usertoken" ADD CONSTRAINT "FK_24a7d7d2e07e80100b1928ffb57" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "userDocument" ADD CONSTRAINT "FK_7187fa6e0168f21d05607aaf4bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_932f1bbab02a532750eadaafbf8" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_dd21e65421aec94dac89bc65ca6" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "userExpertise" ADD CONSTRAINT "FK_670b2fe402826830e7d4725cc30" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "userExpertise" ADD CONSTRAINT "FK_b9ab20130b5979656f3871f2dec" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "appointmentSolicitation" ADD CONSTRAINT "FK_0dcd96506a37f314dce3688e124" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "appointmentSolicitation" ADD CONSTRAINT "FK_b806c453fa1d90b05b076dd0b64" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "refreshtoken" ADD CONSTRAINT "FK_976b6c643d92a090faee7ab7c27" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_15d50a87502380623ff0c27e458" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_cbd7d785672ccc1f0870999b7a2" FOREIGN KEY ("expertise_id") REFERENCES "expertise"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_fd50864371a750b917d8dbeeee4" FOREIGN KEY ("hospital_id") REFERENCES "hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_fd50864371a750b917d8dbeeee4"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_cbd7d785672ccc1f0870999b7a2"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_15d50a87502380623ff0c27e458"`, undefined);
        await queryRunner.query(`ALTER TABLE "refreshtoken" DROP CONSTRAINT "FK_976b6c643d92a090faee7ab7c27"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointmentSolicitation" DROP CONSTRAINT "FK_b806c453fa1d90b05b076dd0b64"`, undefined);
        await queryRunner.query(`ALTER TABLE "appointmentSolicitation" DROP CONSTRAINT "FK_0dcd96506a37f314dce3688e124"`, undefined);
        await queryRunner.query(`ALTER TABLE "userExpertise" DROP CONSTRAINT "FK_b9ab20130b5979656f3871f2dec"`, undefined);
        await queryRunner.query(`ALTER TABLE "userExpertise" DROP CONSTRAINT "FK_670b2fe402826830e7d4725cc30"`, undefined);
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_dd21e65421aec94dac89bc65ca6"`, undefined);
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_932f1bbab02a532750eadaafbf8"`, undefined);
        await queryRunner.query(`ALTER TABLE "userDocument" DROP CONSTRAINT "FK_7187fa6e0168f21d05607aaf4bb"`, undefined);
        await queryRunner.query(`ALTER TABLE "usertoken" DROP CONSTRAINT "FK_24a7d7d2e07e80100b1928ffb57"`, undefined);
        await queryRunner.query(`DROP INDEX "appointments_user_hospital_id_fk"`, undefined);
        await queryRunner.query(`DROP INDEX "appointments_user_expertise_id_fk"`, undefined);
        await queryRunner.query(`DROP INDEX "appointments_user_user_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "appointment"`, undefined);
        await queryRunner.query(`DROP INDEX "email"`, undefined);
        await queryRunner.query(`DROP INDEX "cpf"`, undefined);
        await queryRunner.query(`DROP INDEX "crm"`, undefined);
        await queryRunner.query(`DROP INDEX "rg"`, undefined);
        await queryRunner.query(`DROP INDEX "cellphone"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP INDEX "refresh_token_user_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "refreshtoken"`, undefined);
        await queryRunner.query(`DROP INDEX "appointment_soliciation_user_id_fk"`, undefined);
        await queryRunner.query(`DROP INDEX "appointment_soliciation_appointment_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "appointmentSolicitation"`, undefined);
        await queryRunner.query(`DROP INDEX "userexpertise_expertise_id_fk"`, undefined);
        await queryRunner.query(`DROP INDEX "userexpertise_user_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "userExpertise"`, undefined);
        await queryRunner.query(`DROP TABLE "expertise"`, undefined);
        await queryRunner.query(`DROP INDEX "price_hospital_hospital_id_fk"`, undefined);
        await queryRunner.query(`DROP INDEX "price_expertise_expertise_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "price"`, undefined);
        await queryRunner.query(`DROP TABLE "hospital"`, undefined);
        await queryRunner.query(`DROP INDEX "user_document_user_id_fk"`, undefined);
        await queryRunner.query(`DROP TABLE "userDocument"`, undefined);
        await queryRunner.query(`DROP INDEX "user_id"`, undefined);
        await queryRunner.query(`DROP TABLE "usertoken"`, undefined);
    }

}
