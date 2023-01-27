import Component from '@glimmer/component';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import ProjectModel from 'portfolio/models/project';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  }
}

export default class ProjectDetailFlutkoerper extends Component<Signature> {
  <template>
    <div class={{bem styles}} ...attributes>
      {{{@project.html}}}
      <h2>Projekt Beschreibung</h2>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <h2>Projekt Beschreibung</h2>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br
      /><br><br><br><br><br><br><br><br><br><br><br>
      <h1>Test Ende</h1>
      <br><br><br><br><br><br><br><br>
    </div>
  </template>
}
