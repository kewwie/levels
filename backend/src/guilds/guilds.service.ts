/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { GuildData } from '../types/GuildData';
import { dataSource } from '../data/datasource';
import { MoreThan } from 'typeorm';
import { Guild } from '../data/entities/Guild';
import { Member } from '../data/entities/Member';

@Injectable()
export class GuildsService {

    async postGuilds(guildId: string, guildData: GuildData) { // Create Guild
        console.log("Create");
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        guildData.id = guildId;

        if (guild) {
            return { "message": "Guild already exists" }
        } else {
            await guildDb.insert(guildData);
            console.log("Created")
            return { guildData };
        }
    }

    async patchGuilds(guildId: string, guildData: GuildData) { // Update Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        guildData.id = guildId;

        if (guild) {
            await guildDb.update(guildId, guildData);
            return { guildData };
        } else {
            return { "message": "Guild not found" }
        }
    }

    async deleteGuilds(guildId: string) { // Delete Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        if (guild) {
            await guildDb.delete(guildId)
            return { "message": "Guild deleted" }
        } else {
            return { "message": "Guild not found" }
        }
    }

    async getHourlyLeaderboard(guildId: string, type: string, amount: number = 100, page: number = 0) {
        let start = amount * page;

        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId, hourlyXp: MoreThan(0) }, order: { hourlyXp: "DESC"}, skip: start, take: amount });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId, hourlyMsg: MoreThan(0) }, order: { hourlyMsg: "DESC"}, skip: start, take: amount });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getDailyLeaderboard(guildId: string, type: string, amount: number = 100, page: number = 0) {
        let start = amount * page;

        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId, dailyXp: MoreThan(0) }, order: { dailyXp: "DESC"}, skip: start, take: amount });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId, dailyMsg: MoreThan(0) }, order: { dailyMsg: "DESC"}, skip: start, take: amount });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getWeeklyLeaderboard(guildId: string, type: string, amount: number = 100, page: number = 0) {
        let start = amount * page;

        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId, weeklyXp: MoreThan(0) }, order: { weeklyXp: "DESC"}, skip: start, take: amount });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId, weeklyMsg: MoreThan(0) }, order: { weeklyMsg: "DESC"}, skip: start, take: amount });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getMonthlyLeaderboard(guildId: string, type: string, amount: number = 100, page: number = 0) {
        let start = amount * page;

        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId, monthlyXp: MoreThan(0) }, order: { monthlyXp: "DESC"}, skip: start, take: amount });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId, monthlyMsg: MoreThan(0) }, order: { monthlyMsg: "DESC"}, skip: start, take: amount });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }
}
