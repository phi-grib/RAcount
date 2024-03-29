import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from '../globals';
import { NodeInfoComponent } from '../node-info/node-info.component';
import { MatDialog } from '@angular/material/dialog';
import { EachWorkflowService } from './each-workflow.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
let EachWorkflowComponent = class EachWorkflowComponent {
    constructor(globals, dialog, service) {
        this.globals = globals;
        this.dialog = dialog;
        this.service = service;
        this.actual_node = undefined;
        this.display = 'none';
        this.output = '';
        this.comments = '';
        this.input = [];
        this.resources = [];
        this.Editor = ClassicEditor;
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.columnsToDisplay = this.displayedColumns.slice();
        this.checked = {
            'node1': false,
            'node2': false,
            'node3': false,
            'node4': false,
            'node5': false,
            'node6': false,
            'node7': false,
            'node8': false,
            'node9': false,
            'node10': false,
            'node11': false,
            'node12': false
        };
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    ngOnChanges() {
        if (this.visibleProject !== '') {
            if (this.projectName === this.visibleProject) {
                this.ngAfterViewInit();
            }
        }
    }
    ngOnDestroy() {
        $('.' + this.projectName).connections('remove');
    }
    ngAfterViewInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let nodes_info;
            nodes_info = yield this.service.getProjectInfoSync(this.globals.current_user.projects[this.projectName]);
            for (const node of nodes_info) {
                this.checked['node' + node.node_seq] = node.executed === 'True' ? true : false;
            }
            $('.card').connections('remove');
            $('#' + this.projectName + '_id_1, #' + this.projectName + '_id_2').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_2, #' + this.projectName + '_id_3').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_3, #' + this.projectName + '_id_4').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_4, #' + this.projectName + '_id_5').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_5, #' + this.projectName + '_id_6').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_6, #' + this.projectName + '_id_7').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_7, #' + this.projectName + '_id_8').connections({
                class: 'fast'
            });
            $('#' + this.projectName + '_id_9').connections({
                from: '#' + this.projectName + '_id_8',
                class: 'fast'
            });
            $('#' + this.projectName + '_id_10').connections({
                from: '#' + this.projectName + '_id_8',
                class: 'fast'
            });
            $('#' + this.projectName + '_id_11').connections({
                from: '#' + this.projectName + '_id_9',
                class: 'fast'
            });
            $('#' + this.projectName + '_id_11').connections({
                from: '#' + this.projectName + '_id_10',
                class: 'fast'
            });
            $('#' + this.projectName + '_id_11, #' + this.projectName + '_id_12').connections({
                class: 'fast'
            });
            const that = this;
            setTimeout(function () {
                that.reDraw();
            }, 200);
        });
    }
    nodeInfo_selected(project, node_id) {
        const project_id = this.globals.current_user.projects[project];
        // GET ID PROJECT
        this.service.getNodeInfo(project_id, node_id).subscribe(result => {
            result['outputs'] = ELEMENT_DATA;
            result['node_id'] = node_id;
            if (!this.globals.node_csrf_token.hasOwnProperty(project_id)) {
                this.globals.node_csrf_token[project_id] = {};
            }
            if (result.hasOwnProperty('CSRF_TOKEN')) {
                this.globals.node_csrf_token[project_id][node_id] = result.CSRF_TOKEN;
            }
            else {
                this.globals.node_csrf_token[project_id][node_id] = null;
            }
            const dialogRef = this.dialog.open(NodeInfoComponent, {
                width: '100%',
                data: result
            });
            dialogRef.afterClosed().subscribe(result => {
            });
        }, error => {
            alert('Error getting node');
        });
    }
    reDraw() {
        $('.' + this.projectName).connections('update');
    }
    NodeCompleted(project_id, node_id) {
        this.service.saveNode(project_id, node_id, this.output, this.comments, this.globals.node_csrf_token[project_id][node_id]).subscribe(result => {
        });
        this.globals.change = !this.globals.change;
        this.globals.change_datamatrix = !this.globals.change_datamatrix;
        this.display = 'none';
    }
    onCloseHandled() {
        this.display = 'none';
    }
    addColumn() {
        const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
        this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    }
    removeColumn() {
        if (this.columnsToDisplay.length) {
            this.columnsToDisplay.pop();
        }
    }
    shuffle() {
        let currentIndex = this.columnsToDisplay.length;
        while (0 !== currentIndex) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // Swap
            let temp = this.columnsToDisplay[currentIndex];
            this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
            this.columnsToDisplay[randomIndex] = temp;
        }
    }
    getControl(index, fieldName) {
        alert(index + " -- " + fieldName);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], EachWorkflowComponent.prototype, "projectName", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], EachWorkflowComponent.prototype, "visibleProject", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], EachWorkflowComponent.prototype, "change", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], EachWorkflowComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], EachWorkflowComponent.prototype, "sort", void 0);
EachWorkflowComponent = tslib_1.__decorate([
    Component({
        selector: 'app-each-workflow',
        templateUrl: './each-workflow.component.html',
        styleUrls: ['./each-workflow.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Globals,
        MatDialog,
        EachWorkflowService])
], EachWorkflowComponent);
export { EachWorkflowComponent };
//# sourceMappingURL=each-workflow.component.js.map