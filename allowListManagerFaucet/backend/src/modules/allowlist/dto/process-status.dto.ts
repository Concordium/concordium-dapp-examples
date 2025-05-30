import { ApiProperty } from '@nestjs/swagger'

export class TransactionStatusDto {
  @ApiProperty({ description: 'Current step in the process' })
  step: string

  @ApiProperty({ description: 'Status of current step', enum: ['pending', 'processing', 'completed', 'failed'] })
  status: 'pending' | 'processing' | 'completed' | 'failed'

  @ApiProperty({ description: 'Transaction hash if available', required: false })
  transactionHash?: string

  @ApiProperty({ description: 'Error message if failed', required: false })
  error?: string

  @ApiProperty({ description: 'Progress percentage (0-100)' })
  progress: number
}

export class ProcessStatusDto {
  @ApiProperty({ description: 'Unique process ID' })
  processId: string

  @ApiProperty({ description: 'Overall status of the process' })
  status: 'pending' | 'processing' | 'completed' | 'failed'

  @ApiProperty({ description: 'Array of transaction steps', type: [TransactionStatusDto] })
  steps: TransactionStatusDto[]

  @ApiProperty({ description: 'Final result data', required: false })
  result?: {
    mintTransactionHash?: string
    allowListTransactionHash?: string
    transferTransactionHash?: string
    tokensTransferred?: number
  }

  @ApiProperty({ description: 'Error message if process failed', required: false })
  error?: string
}