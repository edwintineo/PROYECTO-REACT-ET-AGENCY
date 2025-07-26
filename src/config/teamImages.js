// Configuración de imágenes del equipo
import edwinImage from '../assets/team/edwin.svg'
import auraImage from '../assets/team/aura.svg'
import isnaldoImage from '../assets/team/isnaldo.svg'

// Mapeo de imágenes del equipo
export const teamImages = {
  '/images/team/edwin.png': edwinImage,
  '/images/team/aura.png': auraImage,
  '/images/team/isnaldo.png': isnaldoImage,
}

// Función para obtener imagen por ruta
export const getTeamImageFromPath = (imagePath) => {
  return teamImages[imagePath] || null
}

// Función para obtener imagen por nombre
export const getTeamImageByName = (name) => {
  const nameMap = {
    'edwin': edwinImage,
    'aura': auraImage,
    'isnaldo': isnaldoImage,
  }
  return nameMap[name.toLowerCase()] || null
}

export default {
  teamImages,
  getTeamImageFromPath,
  getTeamImageByName,
}