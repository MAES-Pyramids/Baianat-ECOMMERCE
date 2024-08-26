import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async findTaskByEmployeeId(
    @Args('employeeId', { type: () => Int }) employeeId: number,
  ) {
    return this.taskService.findTaskByEmployeeId(employeeId);
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    const { employeeId, ...TaskInput } = createTaskInput;
    return this.taskService.create(employeeId, TaskInput);
  }

  @Query(() => [Task], { name: 'task' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
