-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "chatName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "dbConnectionId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "messageText" TEXT,
    "sqlQuery" TEXT,
    "queryResult" JSONB,
    "querySuccess" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseConnection" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "connectionName" TEXT NOT NULL,
    "connectionString" TEXT NOT NULL,
    "connectionType" TEXT NOT NULL,

    CONSTRAINT "DatabaseConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableMetadata" (
    "id" SERIAL NOT NULL,
    "dbConnectionId" INTEGER NOT NULL,
    "tableName" TEXT NOT NULL,

    CONSTRAINT "TableMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnMetadata" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "columnName" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,

    CONSTRAINT "ColumnMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_dbConnectionId_fkey" FOREIGN KEY ("dbConnectionId") REFERENCES "DatabaseConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseConnection" ADD CONSTRAINT "DatabaseConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableMetadata" ADD CONSTRAINT "TableMetadata_dbConnectionId_fkey" FOREIGN KEY ("dbConnectionId") REFERENCES "DatabaseConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColumnMetadata" ADD CONSTRAINT "ColumnMetadata_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
