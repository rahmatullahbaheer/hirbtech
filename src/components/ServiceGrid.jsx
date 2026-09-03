'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';

export default function ServiceGrid({ services, limit }) {
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayServices.map((service) => (
        <StaggerItem key={service.slug}>
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
