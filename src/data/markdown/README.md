# Gestion du contenu statique

Ce dossier contient les fichiers markdown pour les plans d'étude et notes d'étude.

## ⚠️ IMPORTANT : Workflow de conversion

**Les fichiers markdown sont maintenant la source de vérité !**

### Comment ça fonctionne :

1. **Éditez les fichiers markdown** dans `src/data/markdown/`
2. **Convertissez en TypeScript** avec la commande :
   ```bash
   npm run convert-markdown
   ```
3. **L'application utilise** automatiquement les données converties

### Pourquoi cette approche ?

- ✅ **Facilité d'édition** : Markdown est plus simple à éditer
- ✅ **Version control** : Différences claires dans git
- ✅ **Collaboration** : Plusieurs personnes peuvent éditer
- ✅ **Performance** : L'app utilise des données TypeScript optimisées

## Structure recommandée

### Plans d'étude
- `study-plans/plan-6-weeks.md`
- `study-plans/plan-8-weeks.md`
- `study-plans/plan-12-weeks.md`

### Notes d'étude
- `study-notes/chapter-01.md`
- `study-notes/chapter-02.md`
- ...
- `study-notes/chapter-18.md`

## Format des fichiers

### Plans d'étude (plan-X-weeks.md)
```markdown
# Plan d'étude X semaines

**Description:** Description du plan
**Durée totale:** X semaines
**Heures totales:** XXX heures
**Engagement quotidien:** X-X heures

## Semaine 1
**Chapitres:** 1-3
**Focus:** Fondamentaux de la finance
**Heures:** 20h
**Tâches:**
- Révision des concepts de base
- Quiz chapitres 1-3
- Exercices pratiques

## Semaine 2
...
```

### Notes d'étude (chapter-XX.md)
```markdown
# Chapitre X: Titre du chapitre

## Section 1: Titre de la section
- Point important 1
- Point important 2
- Point important 3

## Section 2: Titre de la section
- Point important 1
- Point important 2
- Point important 3
```

## Workflow de développement

### 1. Édition du contenu
```bash
# Éditez les fichiers markdown
code src/data/markdown/study-plans/plan-8-weeks.md
code src/data/markdown/study-notes/chapter-01.md
```

### 2. Conversion automatique
```bash
# Convertissez en TypeScript
npm run convert-markdown
```

### 3. Test de l'application
```bash
# Lancez l'application
npm run dev
```

## Avantages de cette approche

1. **Facilité de maintenance** : Éditez simplement les fichiers markdown
2. **Version control** : Toutes les modifications sont tracées dans git
3. **Collaboration** : Plusieurs personnes peuvent éditer simultanément
4. **Conversion automatique** : Les fichiers sont convertis en TypeScript optimisé
5. **Performance** : L'application utilise des données statiques, chargement instantané

## Fichiers générés

Le script de conversion génère automatiquement :
- `src/data/studyContent.ts` - Données TypeScript utilisées par l'application
- **⚠️ Ne modifiez PAS ce fichier directement** - Il sera écrasé lors de la conversion

## Résolution des conflits

Si vous avez des données dans `studyContent.ts` et dans les fichiers markdown :

1. **Les fichiers markdown ont priorité** lors de la conversion
2. **Exécutez `npm run convert-markdown`** pour synchroniser
3. **Vérifiez les différences** avec `git diff` avant de commiter

## Exemple de workflow complet

```bash
# 1. Éditez le contenu
echo "**Heures totales:** 180 heures" >> src/data/markdown/study-plans/plan-8-weeks.md

# 2. Convertissez
npm run convert-markdown

# 3. Vérifiez les changements
git diff src/data/studyContent.ts

# 4. Testez l'application
npm run dev

# 5. Commitez
git add .
git commit -m "Update study plan hours"
```
