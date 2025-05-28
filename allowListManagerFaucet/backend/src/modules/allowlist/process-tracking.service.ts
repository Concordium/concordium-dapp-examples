import { Injectable, Logger } from '@nestjs/common'
import { ProcessStatusDto, TransactionStatusDto } from './dto/process-status.dto.js'

interface ProcessData {
  processId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  steps: TransactionStatusDto[]
  result?: any
  error?: string
  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class ProcessTrackingService {
  private readonly logger = new Logger(ProcessTrackingService.name)
  private readonly processes = new Map<string, ProcessData>()

  initializeProcess(processId: string, steps: TransactionStatusDto[]) {
    const processData: ProcessData = {
      processId,
      status: 'pending',
      steps: steps.map((step, index) => ({
        ...step,
        step: step.step,
        status: 'pending',
        progress: (index + 1) * (100 / steps.length),
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.processes.set(processId, processData)
    this.logger.log(`Initialized process ${processId} with ${steps.length} steps`)
  }

  updateStep(
    processId: string, 
    stepIndex: number, 
    status: 'pending' | 'processing' | 'completed' | 'failed',
    transactionHash?: string,
    error?: string
  ) {
    const process = this.processes.get(processId)
    if (!process) {
      throw new Error(`Process ${processId} not found`)
    }

    if (stepIndex >= process.steps.length) {
      throw new Error(`Step index ${stepIndex} out of range`)
    }

    // Update the specific step
    process.steps[stepIndex] = {
      ...process.steps[stepIndex],
      status,
      transactionHash,
      error,
    }

    // Update process status based on step statuses
    if (status === 'failed') {
      process.status = 'failed'
      process.error = error
    } else if (status === 'processing' && process.status === 'pending') {
      process.status = 'processing'
    }

    process.updatedAt = new Date()
    this.processes.set(processId, process)

    this.logger.log(`Updated process ${processId}, step ${stepIndex}: ${status}`)
  }

  markProcessCompleted(processId: string, result: any) {
    const process = this.processes.get(processId)
    if (!process) {
      throw new Error(`Process ${processId} not found`)
    }

    process.status = 'completed'
    process.result = result
    process.updatedAt = new Date()
    this.processes.set(processId, process)

    this.logger.log(`Process ${processId} completed successfully`)
  }

  markProcessFailed(processId: string, error: string) {
    const process = this.processes.get(processId)
    if (!process) {
      throw new Error(`Process ${processId} not found`)
    }

    process.status = 'failed'
    process.error = error
    process.updatedAt = new Date()
    this.processes.set(processId, process)

    this.logger.log(`Process ${processId} failed: ${error}`)
  }

  getProcessStatus(processId: string): ProcessStatusDto {
    const process = this.processes.get(processId)
    if (!process) {
      throw new Error(`Process ${processId} not found`)
    }

    return {
      processId: process.processId,
      status: process.status,
      steps: process.steps,
      result: process.result,
      error: process.error,
    }
  }

  getAllProcesses(): ProcessStatusDto[] {
    return Array.from(this.processes.values()).map(process => ({
      processId: process.processId,
      status: process.status,
      steps: process.steps,
      result: process.result,
      error: process.error,
    }))
  }

  cleanupOldProcesses(olderThanHours: number = 24) {
    const cutoffTime = new Date()
    cutoffTime.setHours(cutoffTime.getHours() - olderThanHours)

    let cleanedCount = 0
    for (const [processId, process] of this.processes.entries()) {
      if (process.createdAt < cutoffTime) {
        this.processes.delete(processId)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      this.logger.log(`Cleaned up ${cleanedCount} old processes`)
    }
  }
}