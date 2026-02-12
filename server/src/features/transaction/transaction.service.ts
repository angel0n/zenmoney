import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TransactionType } from 'generated/prisma/enums';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { PrismaService } from 'src/database/prisma.service';
import { Wallet } from 'generated/prisma/browser';

@Injectable()
export class TransactionService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createTransactionDto: CreateTransactionDto) {
    if(createTransactionDto.toWalletId == null && createTransactionDto.fromWalletId == null){
      throw new NotFoundException("Não foi localizado nenhuma carteira para a transferencia.")
    }

    if(!Object.values(TransactionType).includes(createTransactionDto.type.toUpperCase() as TransactionType)){
      throw new InvalidArgumentException("Tipo de transferencia invalida.")
    }

    if(createTransactionDto.categoryId == null){
      throw new NotFoundException("Não foi localizado a categoria para a transferencia.")
    }

    const category = await this.prisma.transactionCategory.findUnique({ where: {id: createTransactionDto.categoryId} })
    if(category == null) throw new NotFoundException("Categoria não encontrada.")

    var toWallet: Wallet | null = null;
    var fromWallet: Wallet | null = null;

    if(createTransactionDto.toWalletId != null){
      toWallet = await this.prisma.wallet.findUnique({ where: {id:createTransactionDto.toWalletId} })
      if(toWallet == null) throw new NotFoundException("Não foi localizado a carteira para de destino.")
    }

    if(createTransactionDto.fromWalletId != null){
      fromWallet = await this.prisma.wallet.findUnique({ where: {id:createTransactionDto.fromWalletId} })
      if(fromWallet == null) throw new NotFoundException("Não foi localizado a carteira para de origem.")
    }

    return await this.prisma.transaction.create({
      data: {
        amount: createTransactionDto.amount,
        description: createTransactionDto.description,
        type: createTransactionDto.type as TransactionType,
        fromWalletId: fromWallet?.id,
        toWalletId: toWallet?.id,
        categoryId: category.id
      }
    })

  }
}
