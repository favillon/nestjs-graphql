import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean,  IsOptional} from "class-validator";

@ArgsType()
export class CompletedArgs {

    @Field(() => Boolean, { nullable: true, description: 'Completed status of the Todo' })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}