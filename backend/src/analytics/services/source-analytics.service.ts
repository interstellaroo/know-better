import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DomainData } from 'src/common/interfaces/domain-data.interface';

@Injectable()
export class SourceAnalyticsService {
  constructor(private readonly httpService: HttpService) {}

  async getDomainData(url: string): Promise<DomainData> {
    const domain = new URL(url).hostname.replace(/^www\./, '');
    console.log(url, domain);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://rdap.org/domain/${domain}`),
      );

      const registration = response.data.events.find(
        (e) => e.eventAction === 'registration',
      )?.eventDate;
      const updated = response.data.events.find(
        (e) => e.eventAction === 'last changed',
      )?.eventDate;
      const expiry = response.data.events.find(
        (e) => e.eventAction === 'expiration',
      )?.eventDate;
      const registrar = response.data.events
        .find((e) => Array.isArray(e.roles) && e.roles.includes('registrar'))
        ?.vcardArray?.[1]?.find((v) => v[0] === 'fn')?.[3];

      console.log(registration);
      return {
        creationDate: registration,
        updatedDate: updated,
        expiryDate: expiry,
        registrar: registrar,
      };
    } catch (error) {
            console.log(error);
      if (error.response?.status === 404) {
        throw new BadRequestException(
          `RDAP data not found for domain: ${domain}`,
        );
      }
      throw new BadRequestException('There was an error during domain check');
    }
  }

  calculateDomainAgeScore(creationDate: string): number {
    const lifespan = this.calculateDomainLifespan(creationDate);
    const maxAge = 1826; // 5 years

    const clampedLifespan = Math.min(lifespan, maxAge);
    const score = clampedLifespan / maxAge;

    return parseFloat(score.toFixed(2));
  }

  async evalDomain(url: string) {
    const domainData = await this.getDomainData(url);

    const ageScore = this.calculateDomainAgeScore(domainData.creationDate);
    return ageScore;
  }

  calculateDomainLifespan(creationDate: string): number {
    const domainDate = new Date(creationDate);
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - domainDate.getTime();
    const lifespanInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    console.log(lifespanInDays);

    return lifespanInDays;
  }
}
