import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("float")
  domainScore: number;

  @Column("json")
  aiAnalysis: { label: number; confidence: number };

  @Column("json")
  contentAnalysis: { hasClaims: boolean; claims: any[] };

  @Column("float")
  overallScore: number;

  @CreateDateColumn()
  createdAt: Date;
}