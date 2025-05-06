import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsInt, IsOptional, IsString, MaxLength, MinLength, Min } from "class-validator";

@InputType()
export class UpdateTodoInput {

  @Field(() => Int, { description: 'id of the Todo'})
  @IsInt()
  @Min(1)
  id:number

  @Field(() => String, { description: 'Title of the Todo', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(1)
  @IsOptional()
  title?: string;

  @Field(() => String, { description: 'Desciption of the Todo', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { description: 'Done status of the Todo', nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}