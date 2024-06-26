import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'logins' })
export class Login {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id: string; // User ID

    @Column({ type: 'varchar', length: 255 })
    token: string;

    @Column({ type: 'varchar', length: 255, name: 'token_type' })
    tokenType: string;

    @Column({ type: 'varchar', length: 255, name: 'access_token' })
    accessToken: string;

    @Column({ type: 'datetime' })
    expires: Date;

    @Column({ type: 'varchar', length: 255, name: 'refresh_token' })
    refreshToken: string;
}