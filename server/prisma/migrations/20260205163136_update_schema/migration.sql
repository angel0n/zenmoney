/*
  Warnings:

  - You are about to drop the column `currency_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `exchange_rates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exchange_rates" DROP CONSTRAINT "exchange_rates_from_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "exchange_rates" DROP CONSTRAINT "exchange_rates_to_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_user_id_fkey";

-- DropIndex
DROP INDEX "transactions_user_id_transaction_date_idx";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "currency_id",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "exchange_rates";
