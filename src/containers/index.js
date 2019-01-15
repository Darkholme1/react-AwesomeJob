import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom"
import * as route from './routes'
import Cookie from '../components/Cookie'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Cookie>
                        {/* 防止用户刷新后清除redux */}
                    </Cookie>
                    <Route path="/" exact component={route.Home} />
                    <Route path="/test" component={route.Test} />
                    <Route path="/login" component={route.Login} />
                    <Route path='/rcform' component={route.Rcform} />
                    <Route path='/rcform2' component={route.Rcform2} />
                    <Route path='/register' component={route.Register} />
                    <Route path='/bossinfo' component={route.BossInfo} />
                    <Route path='/geniusinfo' component={route.GeniusInfo} />
                    <Route path='/myresume' component={route.MyResume} />
                    <Route path='/basicinfo' component={route.BasicInfo} />
                    <Route path='/addjobwant' component={route.AddJobWant} />
                    <Route path='/addworkexp' component={route.AddWorkExp} />
                    <Route path='/addprojectexp' component={route.AddProjectExp} />
                    <Route path='/addeducationexp' component={route.AddEducationExp} />
                    <Route path='/companyinfo' component={route.CompanyInfo} />
                    <Route path='/edit_company_introduce' component={route.EditCompanyIntroduce} />
                    <Route path='/company_basic' component={route.CompanyBasic} />
                    <Route path='/company_address' component={route.CompanyAddress} />
                    <Route path='/job_content' component={route.JobContent} />
                    <Route path='/job_performance' component={route.JobPerformance} />
                    <Route path='/project_content' component={route.ProjectContent} />
                    <Route path='/project_performance' component={route.ProjectPerformance} />
                </div>
            </Router>
        );
    }
}
export default App;