// src/CustomContainer.ts
import { container } from '@sapphire/framework';

export class CustomContainer {
  guildIds: string[] = [];

  constructor() {
    // Copy over existing properties from the original container
    Object.assign(this, container);
  }
}

// Replace the original container with your custom one
export const customContainer = new CustomContainer();
