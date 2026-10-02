<script setup lang="ts">
import { ref } from 'vue'
import PageHero from '@/components/shared/PageHero.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectDialog from '@/components/projects/ProjectDialog.vue'
import { projects, type Project } from '@/data/projects'

const currentProject = ref<Project | null>(null)

function showProject(project: Project) {
  currentProject.value = project
}

function closeProject() {
  currentProject.value = null
}
</script>

<template>
  <PageHero title="Projekty" image-class="hero-projects" />

  <section class="py-16 md:py-24" aria-labelledby="projects-title">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 id="projects-title" class="text-3xl font-bold text-zinc-900 md:text-4xl">Sprawdź nasze projekty</h2>
        <p class="mt-6">Oto nasze najnowsze realizacje. Każde zdjęcie możesz powiększyć.</p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" @show="showProject" />
      </div>
    </div>
  </section>

  <ProjectDialog :project="currentProject" @close="closeProject" />
</template>
