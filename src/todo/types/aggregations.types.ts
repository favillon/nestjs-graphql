import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType( {description : 'Todo quick Aggregation'} )
export class AggregationType {

    @Field(() => Int, {description: 'Total Todos'})
    totalTodos: number;

    @Field(() => Int, {description: 'Completed Todos'})
    completedTodos: number;

    @Field(() => Int, {description: 'PendingTodos'})
    pendingTodos: number;
}