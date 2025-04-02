import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  @Entity()
  export class Article {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    title: string;
  
    @Column({ nullable: false })
    description: string;
  
    @Column({ nullable: false })
    body: string;
  
    // Define 'tagList' as an array of text in PostgreSQL
    @Column("text", { array: true, nullable: true })
    tagList?: string[];  // This will map to PostgreSQL's 'text[]' type
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  